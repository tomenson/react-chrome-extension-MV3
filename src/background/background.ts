export function main(): void {
  console.log('Background:', location.href);
  chrome.runtime.onInstalled.addListener((details) => {
    console.log('Installed:', details.reason);
  });
}
