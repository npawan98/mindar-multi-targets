import { loadGLTF } from "./libs/loader.js";
import { CSS3DObject } from './libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
const THREE = window.MINDAR.IMAGE.THREE;


// youtube api
const createYoutube = (videoId) => {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {
        videoId: videoId,
        events: {
          onReady: () => {
            resolve(player);
          }
        }
      });
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  });
}



document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {



    const videoPlayer1 = await createYoutube('uYJQIKAVBw8');
    const videoPlayer2 = await createYoutube('uYJQIKAVBw8');


    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets.mind'
    });

    /******** */
    // const { renderer, scene, camera } = mindarThree;

    // const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    // scene.add(light);

    // const raccoon = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
    // raccoon.scene.scale.set(0.1, 0.1, 0.1);
    // raccoon.scene.position.set(0, -0.4, 0);

    // const bear = await loadGLTF('../../assets/models/musicband-bear/scene.gltf');
    // bear.scene.scale.set(0.1, 0.1, 0.1);
    // bear.scene.position.set(0, -0.4, 0);

    // const raccoonAnchor = mindarThree.addAnchor(0);
    // raccoonAnchor.group.add(raccoon.scene);

    // const bearAnchor = mindarThree.addAnchor(1);
    // bearAnchor.group.add(bear.scene);
    // 

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    const obj = new CSS3DObject(document.querySelector("#ar-div"));

    try{
      const imageTarget1 = mindarThree.addCSSAnchor(0);
      imageTarget1.group.add(obj);
  
      imageTarget1.onTargetFound = () => {
        videoPlayer1.playVideo();
      }
      imageTarget1.onTargetLost = () => {
        videoPlayer1.pauseVideo();
      }
    } catch(err){
      alert(err)
    }

    try{
      const imageTarget2 = mindarThree.addCSSAnchor(1);
      imageTarget2.group.add(obj);
  
      imageTarget2.onTargetFound = () => {
        videoPlayer2.playVideo();
      }
      imageTarget2.onTargetLost = () => {
        videoPlayer2.pauseVideo();
      }
    }catch(err){
      alert(err)
    }






    // const imageTarget2 = mindarThree.addCSSAnchor(1);
    // imageTarget2.group.add(obj);

    // imageTarget2.onTargetFound = () => {
    //   videoPlayer2.playVideo();
    // }
    // imageTarget1.onTargetLost = () => {
    //   videoPlayer2.pauseVideo();
    // }





    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

  }
  start();
});
