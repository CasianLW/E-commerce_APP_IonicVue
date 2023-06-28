<template>
  <div ref="googleMap" class="google-map"></div>
</template>

<script>
export default {
  async mounted() {
    await this.loadGoogleMapsApi();
    this.initMap();
  },
  methods: {
    loadGoogleMapsApi() {
      return new Promise((resolve, reject) => {
        if (!window.google) {
          let script = document.createElement("script");
          script.type = "text/javascript";

          window.resolveGoogleMapsPromise = function () {
            resolve(window.google);
            delete window.resolveGoogleMapsPromise;
          };

          script.src = `https://maps.googleapis.com/maps/api/js?key=${
            import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
          }&callback=resolveGoogleMapsPromise`;

          script.onerror = reject;
          document.head.appendChild(script);
        } else {
          resolve(window.google);
        }
      });
    },
    initMap() {
      const map = new window.google.maps.Map(this.$refs.googleMap, {
        center: { lat: 48.870562, lng: 2.363184 },
        zoom: 15,
      });
    },
  },
};
</script>

<style scoped>
.google-map {
  height: 300px;
  width: 100%;
}
</style>
