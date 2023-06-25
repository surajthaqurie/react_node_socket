const joi = require("joi");

exports.postCommentValidation = (data) => {
  const schema = joi.object({
    postId: joi.string().required().trim(),
  });

  return schema.validate(data);
};
