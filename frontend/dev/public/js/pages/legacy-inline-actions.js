document.addEventListener("click", function (event) {
  var target = event.target;
  var control = target && target.closest ? target.closest("[data-legacy-onclick]") : null;
  if (!control) return;

  var action = (control.getAttribute("data-legacy-onclick") || "").replace(/\s+/g, " ").trim();
  var share = action.match(/^shareArticle\('([^']+)'\)$/);
  var toast = action.match(/^showToast\('([^']*)'\)/);

  if (action === "closeLoginModal()") {
    window.closeLoginModal ? window.closeLoginModal() : document.getElementById("login-modal")?.classList.add("opacity-0", "pointer-events-none");
  } else if (action === "openLoginModal()") {
    window.openLoginModal ? window.openLoginModal() : document.getElementById("login-modal")?.classList.remove("opacity-0", "pointer-events-none");
  } else if (action === "toggleLike()") {
    window.toggleLike ? window.toggleLike() : (function () { var icon = document.getElementById("heart-icon"); if (icon) icon.className = icon.className.indexOf("far ") === 0 ? "fas fa-heart text-xs" : "far fa-heart text-xs"; })();
  } else if (action === "toggleFollowAuthor()") {
    window.toggleFollowAuthor ? window.toggleFollowAuthor() : null;
  } else if (share) {
    window.shareArticle ? window.shareArticle(share[1]) : (navigator.share ? navigator.share({ url: window.location.href }).catch(function () {}) : null);
  } else if (action === "handleCommentSubmit(event)") {
    event.preventDefault();
    var comment = document.getElementById("comment-input");
    if (!comment || !comment.value.trim()) window.showToast ? window.showToast("Silakan tuliskan komentar Anda terlebih dahulu!") : null;
    else window.openLoginModal ? window.openLoginModal() : document.getElementById("login-modal")?.classList.remove("opacity-0", "pointer-events-none");
  } else if (toast) {
    window.showToast ? window.showToast(toast[1]) : null;
    if (action.indexOf("closeLoginModal()") !== -1) window.closeLoginModal ? window.closeLoginModal() : document.getElementById("login-modal")?.classList.add("opacity-0", "pointer-events-none");
  }
});

