import {loadGLTF, loadVideo} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("./assets/videos/vid2.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 204/480);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });


    // video 2
    const video2 = await loadVideo("./assets/videos/vid2.mp4");
    const geometry2 = new THREE.PlaneGeometry(1, 1080/1656);
    const plane2 = new THREE.Mesh(geometry2, material);

    const anchor1 = mindarThree.addAnchor(1);
    anchor1.group.add(plane2);

    anchor1.onTargetFound = () => {
      video2.play();
    }
    anchor1.onTargetLost = () => {
      video2.pause();
    }
    video.addEventListener( 'play', () => {
      video2.currentTime = 0;
    });



    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
