import { Camera, Object3D, Object3DEventMap, Vector2, Vector3 } from "three";

export const SetObjectLayerTraverse = (
  object: Object3D<Object3DEventMap>,
  layer: number
) => {
  object.traverse((object) => {
    object.layers.set(layer); // Layer 1
  });
};

export const NDCToObjectWorld = (
  coordinates: Vector2,
  object: Object3D<Object3DEventMap>,
  camera: Camera
) => {
  const objectPosition = object.position.clone();
  objectPosition.project(camera);
  const ndcPosition = new Vector3(
    coordinates.x,
    coordinates.y,
    objectPosition.z
  );

  return ndcPosition.unproject(camera);
};
