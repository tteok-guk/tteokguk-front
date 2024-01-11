export const isMobileDevice = () => {
  if (typeof window !== 'undefined') {
    const userDevice = window.navigator.userAgent
    const mobileRegex = [
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /Android/i,
      /BlackBerry/i,
      /nokia/i,
      /windows ce/i,
      /Windows Phone/i,
      /webOS/i,
      /IEMobile/i,
      /Opera Mini/i,
      /Opera Mobi/i,
      /Xiaomi/i,
      /Huawei/i,
    ]
    return mobileRegex.some((mobile) => userDevice.match(mobile))
  }
  return false
}
