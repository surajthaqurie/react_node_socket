const { default_users } = require("./default_user.data");
const { default_posts } = require("./default_post.data");
const { default_comments } = require("./default_comment.data");

(async () => {
  await default_users();
  await default_posts();
  await default_comments();
})();
