// src/components/AFrameScene.js

import "aframe";
import "mind-ar/dist/mindar-face-aframe.prod.js";

import * as THREE from "three"; // Import Three.js if required

import React, { useEffect } from "react";

import { MindARThree } from "mind-ar/dist/mindar-face-three.prod.js";

const AFrameScene = () => {
  useEffect(() => {
    const boxEl = document.querySelector("#color-changing-box");

    let negativeYDirection = false;
    let postiveYDirection = false;
    let postiveXDirection = false;
    let negativeXDirection = false;
    // Your A-Frame component code here, such as registering the 'check-position' component

    const updateBoxPositionAndRotation = () => {
      const boxWorldQuaternion = new THREE.Quaternion();
      boxEl.object3D.getWorldQuaternion(boxWorldQuaternion);
      const euler = new THREE.Euler().setFromQuaternion(boxWorldQuaternion);
      // const worldQuaternion = new MindARThree.Quaternion(); // Create a MindARThree Quaternion.
      // boxEl.getWorldQuaternion(worldQuaternion);
      // const euler = new MindARThree.Euler().setFromQuaternion(worldQuaternion);
      inputOnNod(euler);
      inputOnDirection(euler);
      requestAnimationFrame(updateBoxPositionAndRotation);
    };

    const inputOnNod = (euler) => {
      const nodRotationRadian = euler.z;
      const nodRoationDegree = (nodRotationRadian * 180) / Math.PI;
      if (nodRoationDegree < -15) {
        boxEl.setAttribute("color", "red");
      } else if (nodRoationDegree > 20) {
        boxEl.setAttribute("color", "green");
      } else {
        boxEl.setAttribute("color", "blue");
      }
    };
    const inputOnDirection = (euler) => {
      const yRotation = euler.y;
      const yRotationDegree = (yRotation * 180) / Math.PI;
      const xRotation = euler.x;
      const xRotationDegree = (xRotation * 180) / Math.PI;
      console.log("XXXXXXXXXXXXXXXX ->>>>>" + xRotationDegree);
      if (yRotationDegree >= 15) {
        postiveYDirection = true;
      }
      if (yRotationDegree < -15) {
        negativeYDirection = true;
      }
      if (xRotationDegree >= 15) {
        postiveXDirection = true;
      }
      if (xRotationDegree < -15) {
        negativeXDirection = true;
      }

      if (negativeYDirection === true && postiveYDirection === true) {
        boxEl.setAttribute("color", "red");
        setTimeout(function () {
          postiveYDirection = false;
          negativeYDirection = false;
        }, 1000);
      }
      if (postiveXDirection && negativeXDirection) {
        boxEl.setAttribute("color", "green");
        setTimeout(function () {
          postiveXDirection = false;
          negativeXDirection = false;
        }, 1000);
      }
    };
    updateBoxPositionAndRotation();
  }, []);

  return (
    <a-scene
      mindar-face
      embedded
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera active="false" position="0 0 0"></a-camera>
      <a-entity
        mindar-face-target="anchorIndex: 10"
        camera
        look-controls
        check-position
      >
        {/* <a-entity camera="active: true" look-controls wasd-controls position="0 1.6 0" data-aframe-default-camera> */}
        <a-box
          id="color-changing-box"
          color="blue"
          width="0.8"
          height="0.6"
          depth="0.1"
          position="0 0.1 -0.1"
          rotation="0 0 0"
        >
          <a-text
            value="This text will wrap inside the box. This text will wrap inside the box."
            color="white"
            position="0 0 0.05"
            width="0.38"
            wrap-count="35"
            align="center"
            baseline="bottom"
            scale="-2 2 1"
          ></a-text>
          <a-animation
            attribute="color"
            begin="move-head"
            dur="200"
            to="red"
          ></a-animation>
        </a-box>
      </a-entity>
    </a-scene>
  );
};

export default AFrameScene;
