import PngPlane, { PngPlaneRef } from "../PngPlane/PngPlane";

import { Suspense, useContext, useRef } from "react";
import { Template3DObjectContext } from "./Template3DObjectContext";
import { MovementMode, PieceChild, TemplateObject } from "@core";
import {
  MathUtils,
  Object3D,
  Object3DEventMap,
  Raycaster,
  Vector3,
} from "three";
import { useThree } from "@react-three/fiber";
import { useMousePosition } from "@hooks/useMousePositiion";
import { NDCToObjectWorld, SetObjectLayerTraverse } from "@utils/ThreeUtils";
import { useFullPieces, useSceneSettings } from "@hooks/index";
import { useObjectContextMenu } from "@features/ContextMenu/Hooks/useObjectContextMenu";
import { ArrayToVector3 } from "@utils/Math";
import {
  GetPieceChildNeighbours,
  GetPieceLeft,
  GetPieceMostLeft,
  GetPieceMostRight,
  GetPieceRight,
} from "@utils/Wigits";
import BasisContextMenuHandler from "../../Features/ContextMenu/Components/ContextMenuhandlers/BasisContextMenuHandler";
import PieceChildContextMenuHandler from "../../Features/ContextMenu/Components/ContextMenuhandlers/PieceChildContextMenuHandler";

export default function Template3DObject() {
  const { templateObject } = useContext(Template3DObjectContext);
  const raycaster = useRef(new Raycaster());
  const { camera, scene, gl } = useThree();
  const { mousePos } = useMousePosition();
  const { DispatchCreatedTemplates } = useFullPieces();

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

  const { open: openMenu, setMenu, setMenuPosition } = useObjectContextMenu();

  const ref = useRef<PngPlaneRef>(null!);

  const PlaceMenuAtMouseposition = (event: MouseEvent) => {
    const offsetX = event.clientX - gl.domElement.getBoundingClientRect().left;
    const offsetY = event.clientY - gl.domElement.getBoundingClientRect().top;
    setMenuPosition({ x: offsetX, y: offsetY - 80 });
  };
  const { movementMode } = useSceneSettings();

  const handleChildPieceDrag = (
    _object: Object3D<Object3DEventMap>,
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

      let moveableAreaWidth =
        parentTemplate.templateModel.base.layers[pieceChild.layer].width ?? 0;

      const rightOffset =
        (moveableAreaWidth / 2 - GetPieceRight(pieceChild.piece)) / 50;

      const leftOffset =
        -(moveableAreaWidth / 2 - GetPieceLeft(pieceChild.piece)) / 50;

      let [leftChild, rightChild] = GetPieceChildNeighbours(
        parentTemplate,
        pieceChild
      );

      if (pieceChild.position[0] - xPos > 0) {
        if (leftChild) {
          const minPosX = GetPieceMostRight(leftChild);
          xPos = MathUtils.clamp(
            xPos,
            minPosX + pieceChild.piece.width / 100,
            Infinity
          );
        }
      } else {
        if (rightChild) {
          const maxPosX = GetPieceMostLeft(rightChild);
          xPos = MathUtils.clamp(
            xPos,
            -Infinity,
            maxPosX - pieceChild.piece.width / 100
          );
        }
      }

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

  return (
    <Suspense>
      <PngPlane
        onDrag={() => {
          handleTemplateDrag(ref.current, templateObject);
        }}
        onDrop={(event) => {
          PlaceMenuAtMouseposition(event);
          setMenu(
            <BasisContextMenuHandler
              template={templateObject}
            ></BasisContextMenuHandler>
          );
          openMenu();
        }}
        key={templateObject.id}
        ref={ref}
        {...templateObject.templateModel.base}
        position={ArrayToVector3(templateObject.position)}
        rotation={ArrayToVector3(templateObject.rotation)}
        scale={ArrayToVector3(templateObject.scale)}
        id={templateObject.id}
      >
        {templateObject.templateModel.children.map((child, childIndex) => (
          <PngPlane
            onDrag={() =>
              handleChildPieceDrag(
                ref.current.container.children[childIndex],
                child,
                ref.current.container,
                templateObject
              )
            }
            onDrop={(event) => {
              PlaceMenuAtMouseposition(event);
              setMenu(
                <PieceChildContextMenuHandler
                  piece={child}
                  template={templateObject}
                ></PieceChildContextMenuHandler>
              );
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
                ((templateObject.templateModel.base?.layers[child.layer]
                  ?.positionOffset ?? 0) +
                  childIndex * 0.01) /
                  50,
                child.position[2]
              )
            }
          />
        ))}
      </PngPlane>
    </Suspense>
  );
}
