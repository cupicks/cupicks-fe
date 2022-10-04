const CACHE_NAME = "Cupick";

// 오프라인 파일 리스트
const FILES_TO_CACHE = ["offline.html"];

// waitUntil - Service Worker는 waitUntil 안의 코드가 실행되기 전까지는 설치되지 않음.
// caches - 데이터를 저장할 수 있도록 주어진 Service Worker의 범위 내에서 사용할 수 있는 특별한 객체
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log("install");
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
});

// 더 이상 필요하지 않은 파일을 제거하고 앱이 끝난 후 정리하는데 사용
// 최상단에 버전명이 바뀌었을 때 작동하는 코드
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            // console.log("Removing old cache", key);
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

// 네트워크에서 뭔가를 받아올 때 인터넷에 연결되지 않을 경우 캐시에 저장된 것들을 꺼내는 역할
self.addEventListener("fetch", (evt) => {
  if (evt.request.mode !== "navigate") {
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    }),
  );
});
