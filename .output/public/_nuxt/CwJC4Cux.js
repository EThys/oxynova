function i(e){return(e||"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g," ").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/\s+/g," ").trim()}function l(e){return/<[a-z][\s\S]*>/i.test(e||"")}function p(e,t=160){let r=l(e)?i(e):e||"";return r=r.replace(/\[[^\]]*https?:\/\/[^\]]+\]/gi," ").replace(/https?:\/\/\S+/gi," ").replace(/\s+/g," ").trim(),r.length>t?`${r.slice(0,t).trim()}...`:r}export{p as e,l,i as s};
