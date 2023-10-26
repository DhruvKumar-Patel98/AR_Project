import "aframe";
import "mind-ar/dist/mindar-face-aframe.prod.js";

import * as THREE from "three";

import React, { useEffect, useRef } from "react";

import left_arrow from "./images/left_arrow.png";
import question_box from "./images/question_box.png";
import right_arrow from "./images/right_arrow.png";

export default () => {
  useEffect(() => {
    const sceneEl = document.querySelector("a-scene");
    const arSystem = sceneEl.systems["mindar-face-system"];
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start();
    });

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

    return () => {
      arSystem.stop();
    };
  }, []);

  return (
    <div class="camera-container">
      <a-scene
        mindar-face="autoStart: false"
        embedded
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img id="question-box" src={question_box}></img>
        </a-assets>
        <a-assets>
          <img id="left_arrow" src={left_arrow}></img>
        </a-assets>
        <a-assets>
          <img id="right_arrow" src={right_arrow}></img>
        </a-assets>
        <a-camera
          active="false"
          position="0 0 0"
          look-controls="false"
        ></a-camera>
        <a-entity mindar-face-target="anchorIndex: 10">
          <a-image
            id="color-changing-box"
            src="#question-box"
            position="0 0.5 0"
            width="1"
            height="0.5"
          >
            <a-text
              value="This text will wrap inside the box. This text will wrap inside the box."
              color="white"
              position="0 0 0"
              width="0.38"
              wrap-count="35"
              align="center"
              baseline="bottom"
              scale="2 2 1"
            ></a-text>
          </a-image>
          <a-image
            id="color-changing-box"
            src="#left_arrow"
            position="-0.8 0 0.2"
            width="0.4"
            height="0.3"
          ></a-image>
          <a-image
            id="color-changing-box"
            src="#right_arrow"
            position="0.8 0 0.2"
            width="0.4"
            height="0.3"
          ></a-image>

          {/* <a-box
            // id="color-changing-box"
            color="blue"
            width="0.8"
            height="0.6"
            depth="0.1"
            position="0 0.3 -0.1"
            rotation="0 0 0"
          > */}

          <a-animation
            attribute="color"
            begin="move-head"
            dur="200"
            to="red"
          ></a-animation>
          {/* </a-box> */}
        </a-entity>
      </a-scene>
    </div>
  );
};
