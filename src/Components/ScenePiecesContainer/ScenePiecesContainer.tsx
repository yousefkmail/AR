import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { PngPlane, PngPlaneRef } from "../PngPlane/PngPlane";
import {
  Group,
  MathUtils,
  Object3D,
  Object3DEventMap,
  Raycaster,
  Vector3,
} from "three";
import { GroupProps, useThree } from "@react-three/fiber";
import PreviewHandler from "../PreviewHandler";
import { ArrayToVector3 } from "../../Utils/MathUtils";
import {
  NDCToObjectWorld,
  SetObjectLayerTraverse,
} from "../../Utils/ThreeUtils";
import { PieceObject } from "../../Core/PiecePlane";
import { useMousePosition } from "../../Hooks/useMousePositiion";
import { TemplateObject } from "../../Core/Template";
import { useSceneSettings } from "../../Hooks/useSceneSettings";
import { MovementMode } from "../../Context/SceneSettingsContext";
import { PieceChild } from "../../DataService/Models/TemplateModel";
import {
  GetPieceLeft,
  GetPieceRight,
} from "../../Utils/WigitsUtils/PieceUtils";
import { useMouseRaycaster } from "../../Hooks/useMouseRaycaster";
import { useObjectContextMenu } from "../../Features/ContextMenu/useObjectContextMenu";

export type ScenePiecesContainerRef = {
  group: Group;
  Pieces: (PngPlaneRef | null)[];
  Templates: (PngPlaneRef | null)[];
};

export const ScenePiecesContainer = forwardRef<
  ScenePiecesContainerRef,
  GroupProps
>((_props, ref) => {
  const piecesRefs = useRef<PngPlaneRef[]>([]);
  const templatesRef = useRef<PngPlaneRef[]>([]);

  const groupRef = useRef<Group>(null);
  // Expose childrenRefs array through the parent ref
  useImperativeHandle(ref, () => ({
    group: groupRef.current!,
    Pieces: piecesRefs.current,
    Templates: templatesRef.current,
  }));
  const raycaster = useRef(new Raycaster());
  const { camera, scene, gl } = useThree();
  const { mousePos } = useMousePosition();
  const { movementMode } = useSceneSettings();
  const { createdPieces, createdTemplates } = useFullPieces();
  const {
    DispatchCreatedPieces,
    DispatchCreatedTemplates,
    FindTemplateWithId,
    FindSceneObjectWithId,
    HandlePieceDroppedOnPlane,
  } = useFullPieces();
  const {
    open: openMenu,
    setMenuPosition,
    setActiveObject,
    close,
  } = useObjectContextMenu();
  const { getFirstObject, setIgnoredArray } = useMouseRaycaster(camera, scene);
  const handlePieceDrag = (object: PngPlaneRef, pieceObject: PieceObject) => {
    setIgnoredArray([object.container]);
    const obj = getFirstObject();

    if (!obj) return;
    DispatchCreatedPieces({
      type: "move",
      payload: {
        piece: pieceObject,
        position: [obj.point.x, obj.point.y + 0.01, obj.point.z],
      },
    });
  };

  const handleTemplateDrag = (
    object: PngPlaneRef,
    templateObject: TemplateObject
  ) => {
    raycaster.current.setFromCamera(mousePos, camera);

    SetObjectLayerTraverse(object.container, 1);

    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;

      DispatchCreatedTemplates({
        type: "move",
        payload: {
          basis: templateObject,
          position: [
            intersectionPoint.x,
            intersectionPoint.y + 0.01,
            intersectionPoint.z,
          ],
        },
      });

      SetObjectLayerTraverse(object.container, 0);
    }
  };

  const handleChildPieceDrag = (
    object: Object3D<Object3DEventMap>,
    pieceChild: PieceChild,
    parent: Object3D<Object3DEventMap>,
    parentTemplate: TemplateObject
  ) => {
    if (movementMode === MovementMode.Parent) {
      raycaster.current.setFromCamera(mousePos, camera);

      SetObjectLayerTraverse(parent, 1);

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );
      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;

        DispatchCreatedTemplates({
          type: "move",
          payload: {
            basis: parentTemplate,

            position: [
              intersectionPoint.x,
              intersectionPoint.y + 0.01,
              intersectionPoint.z,
            ],
          },
        });

        SetObjectLayerTraverse(parent, 0);
      }
    } else {
      const position = NDCToObjectWorld(mousePos, parent, camera);
      let xPos = parent?.worldToLocal(position).x;

      const rightOffset =
        (parentTemplate.templateModel.base.width / 2 -
          GetPieceRight(pieceChild.piece)) /
        50;

      const leftOffset =
        -(
          parentTemplate.templateModel.base.width / 2 -
          GetPieceLeft(pieceChild.piece)
        ) / 50;

      DispatchCreatedTemplates({
        type: "move_child",
        payload: {
          piece: pieceChild,
          position: [
            MathUtils.clamp(xPos, leftOffset, rightOffset),
            pieceChild.position[1],
            0,
          ],
        },
      });
    }
  };

  const handlePieceDropped = (
    piece: PieceObject,
    piece3DObject: PngPlaneRef
  ) => {
    setIgnoredArray([piece3DObject.container]);
    const obj = getFirstObject();

    if (obj?.object.userData.id) {
      const template = FindTemplateWithId(obj?.object.userData.id);
      if (template) {
        const tempalate3DObject = FindSceneObjectWithId(template.id);

        if (!tempalate3DObject) return;
        const position = NDCToObjectWorld(mousePos, tempalate3DObject, camera);
        HandlePieceDroppedOnPlane(
          piece,
          template,
          tempalate3DObject.worldToLocal(position)
        );
      }
    }
  };

  const PlaceMenuAtMouseposition = (event: MouseEvent) => {
    const offsetX = event.clientX - gl.domElement.getBoundingClientRect().left;
    const offsetY = event.clientY - gl.domElement.getBoundingClientRect().top;
    setMenuPosition({ x: offsetX, y: offsetY - 80 });
  };

  useEffect(() => {
    gl.domElement.addEventListener("pointerdown", close);
    return () => {
      gl.domElement.removeEventListener("pointerdown", close);
    };
  }, []);

  return (
    <Suspense>
      <group ref={groupRef}>
        {createdPieces.map((pieceObject, index) => (
          <PngPlane
            key={pieceObject.id}
            ref={(item) => (piecesRefs.current[index] = item!)}
            onDrag={() =>
              handlePieceDrag(piecesRefs.current[index], pieceObject)
            }
            onDrop={(event: MouseEvent) => {
              handlePieceDropped(pieceObject, piecesRefs.current[index]);
              setActiveObject(pieceObject);
              PlaceMenuAtMouseposition(event);
              openMenu();
            }}
            {...pieceObject.piece}
            id={pieceObject.id}
            position={ArrayToVector3(pieceObject.position)}
            rotation={ArrayToVector3(pieceObject.rotation)}
            scale={
              pieceObject.piece.isFlipable && pieceObject.piece.isFlipped
                ? new Vector3(-1, 1, 1)
                : new Vector3(1, 1, 1)
            }
            applyOffset
          />
        ))}
        {createdTemplates.map((item, index) => (
          <PngPlane
            onDrag={() => {
              handleTemplateDrag(templatesRef.current[index], item);
            }}
            onDrop={(event) => {
              setActiveObject(item);
              PlaceMenuAtMouseposition(event);
              openMenu();
            }}
            key={item.id}
            ref={(item) => (templatesRef.current[index] = item!)}
            {...item.templateModel.base}
            position={ArrayToVector3(item.position)}
            rotation={ArrayToVector3(item.rotation)}
            scale={ArrayToVector3(item.scale)}
            id={item.id}
          >
            {item.templateModel.children.map((child, childIndex) => (
              <PngPlane
                onDrag={() =>
                  handleChildPieceDrag(
                    templatesRef.current[index].container.children[childIndex],
                    child,
                    templatesRef.current[index].container,
                    item
                  )
                }
                onDrop={(event) => {
                  if (movementMode === MovementMode.Parent) {
                    setActiveObject(item);
                  } else setActiveObject(child);
                  PlaceMenuAtMouseposition(event);
                  openMenu();
                }}
                key={child.id}
                {...child.piece}
                id={child.id}
                scale={
                  child.piece.isFlipable && child.piece.isFlipped
                    ? new Vector3(-1, 1, 1)
                    : new Vector3(1, 1, 1)
                }
                applyOffset
                rotation={new Vector3(-90, 0, 0)}
                position={
                  new Vector3(
                    child.position[0],
                    ((item.templateModel.base?.layers[child.layer]
                      ?.positionOffset ?? 0) +
                      childIndex * 0.01) /
                      50,
                    child.position[2]
                  )
                }
              />
            ))}
          </PngPlane>
        ))}
        <PreviewHandler></PreviewHandler>
      </group>
    </Suspense>
  );
});
