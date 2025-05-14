export default function formatTime(timestamp: string) {
  const date = new Date(timestamp);

  // 提取年月日时分（UTC 时间）
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份补零
  const day = String(date.getDate()).padStart(2, "0"); // 日期补零
  const hours = String(date.getHours()).padStart(2, "0"); // 小时补零
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 分钟补零

  return `${year}年${month}月${day}日 ${hours}时${minutes}分`;
}
