<template>
  <div class="app-page app-page-wrapper">

    <!-- <app-scan-camera
      :showResult.sync="showResult"
      :notSupported.sync="notSupported"
      :result.sync="result"
    ></app-scan-camera> -->

    <app-scan-file-upload></app-scan-file-upload>

    <app-scan-result :result="result" :active.sync="showResult"></app-scan-result>
  </div>
</template>

<script>
import AppScanFileUpload from "./ScanFileUpload";
// import AppSnackbar from "./NoCamSnackbar";
import AppScanResult from "./ScanResult";

export default {
  data: () => ({
    result: [],
    showResult: false,
    notSupported: false
  }),
  components: {
    AppScanFileUpload,
    // AppSnackbar,
    AppScanResult
  }
};
</script>
