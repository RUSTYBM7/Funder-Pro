class CookieBanner{constructor(element){this.el=element
this.acceptBtn=this.el.querySelector('.js-accept')
this.declineBtn=this.el.querySelector('.js-decline')
this.COOKIE_NAME='funderpro_cookie_notice_accepted'
this.init()}
init(){const accepted=this.getCookie(this.COOKIE_NAME)
if(accepted===null){this.el.classList.add('is-enabled')
setTimeout(this.show.bind(this),1000)}else if(accepted==='true'){this.accept()}
this.bindEvents()}
bindEvents(){this.acceptBtn.addEventListener('click',this.onAccept.bind(this))
this.declineBtn.addEventListener('click',this.onDecline.bind(this))}
onAccept(){this.setCookie(this.COOKIE_NAME,'true',365)
this.hide()
this.accept()}
onDecline(){this.setCookie(this.COOKIE_NAME,'false',365)
this.hide()}
accept(){const fn=window.on_cookie_notice_accept
fn&&fn()}
show(){this.el.classList.add('is-opened')}
hide(){this.el.classList.remove('is-opened')}
setCookie(name,value,days){const d=new Date()
d.setTime(d.getTime()+24*60*60*1000*days)
document.cookie=name+'='+value+';path=/;expires='+d.toGMTString()}
getCookie(name){const v=document.cookie.match('(^|;) ?'+name+'=([^;]*)(;|$)')
return v?v[2]:null}}
document.addEventListener('DOMContentLoaded',function(){const cookieBannerElement=document.querySelector('.site-cookie-notice')
if(cookieBannerElement){new CookieBanner(cookieBannerElement)}})