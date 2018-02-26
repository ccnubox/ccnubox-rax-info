import request from "../box-ui/util/request";

const InfoService = {
  getInfoList(options) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/apartment",
    });
  }
};

export default InfoService;
