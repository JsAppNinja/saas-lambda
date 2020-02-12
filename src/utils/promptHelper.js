module.exports.getPrompt = ({ id, text, ssml }) => {
  const { Prompt, ConnectPrompt, Language } = require('../models');
  if (text) {
    return Promise.resolve({
      SSML: `<speak>${text}</speak>`,
    });
  } if (ssml) {
    return Promise.resolve({
      SSML: ssml,
    });
  } if (id) {
    return Prompt.findById(id, {
      include: [
        { model: ConnectPrompt, as: 'ConnectPrompt', attributes: ['ARN'] },
        { model: Language, as: 'Language', attributes: ['Name'] },
      ],
    });
  }
  return Promise.resolve({});
};

module.exports.addPromptToResponse = (response, prefix, prompt) => {
  response[`${prefix}_prompt_language`] = prompt && prompt.Language && prompt.Language.Name;
  response[`${prefix}_prompt_voice`] = prompt && prompt.Voice;
  response[`${prefix}_prompt_type`] = prompt && ((prompt.ConnectPrompt && 'Prerecording') || (prompt.Text && 'Text') || (prompt.SSML && 'SSML'));
  response[`${prefix}_prompt_content`] = prompt && (prompt.ConnectPrompt && prompt.ConnectPrompt.ARN || (prompt.Text && `<speak>${prompt.Text}</speak>`) || prompt.SSML);
};
