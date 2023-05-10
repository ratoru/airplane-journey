import { Instance, Instances, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const INSTANCES = 240;
const MAX_OPACITY = 0.1;

const SpeedShape = () => {
  const ref = useRef();
  let randomPosition = {
    x: 0,
    y: 0,
    z: 0,
  };
  let randomSpeed = 0;

  const resetRandom = () => {
    randomPosition = {
      x: THREE.MathUtils.randFloatSpread(8),
      y: THREE.MathUtils.randFloatSpread(5),
      z: THREE.MathUtils.randFloatSpread(8),
    };
    randomSpeed = THREE.MathUtils.randFloat(16, 20);
  };
  resetRandom();

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.position.z += randomSpeed * delta;
      // Check if behind camera
      if (ref.current.position.z > 5) {
        resetRandom();
        ref.current.position.z = randomPosition.z;
      }
    }
  });

  return (
    <Instance
      ref={ref}
      color="white"
      position={[randomPosition.x, randomPosition.y, randomPosition.z]}
      rotation-y={Math.PI / 2}
    />
  );
};

export const Speed = () => {
  const speedMaterial = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  useFrame((_state, delta) => {
    if (scroll.offset - lastScroll.current > 0.0005) {
      speedMaterial.current.opacity = MAX_OPACITY;
    }
    lastScroll.current = scroll.offset;
    // Slowly fade out speed animation
    if (speedMaterial.current.opacity > 0) {
      speedMaterial.current.opacity -= delta * 0.2;
    }
  });

  return (
    <group>
      <Instances>
        <planeGeometry args={[1, 0.004]} />
        <meshBasicMaterial
          ref={speedMaterial}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          opacity={0}
          transparent
        />
        {Array(INSTANCES)
          .fill()
          .map((_, key) => (
            <SpeedShape key={key} />
          ))}
      </Instances>
    </group>
  );
};
