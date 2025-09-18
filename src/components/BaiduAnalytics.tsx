/**
 * Baidu Analytics Component
 * 百度统计代码组件
 */

export const BaiduAnalyticsScript = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    }} />
  )
}

// 也可以导出为纯字符串，用于直接插入
export const BaiduAnalyticsCode = `
  <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  </script>
`