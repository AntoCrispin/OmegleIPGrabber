window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `https://ipinfo.io/${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      console.clear(); 
      const output = `
          ---------------------
          ip: ${json.ip}
          Country Code: ${json.country}
          Region: ${json.region}
          City: ${json.city}
          Lat / Long: (${json.loc})
          isp: ${json.org}
          Postal Code: ${json.postal}
          Timezone: ${json.timezone}
          ---------------------
          `;
      console.log(output);
    })
  );
};
