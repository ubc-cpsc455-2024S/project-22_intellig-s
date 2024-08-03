const replicate = require("./replicate");

async function debugJson(jsonString) {
  const input = {
    top_k: 0,
    top_p: 0.95,
    prompt: `${jsonString}`,
    max_tokens: 2000,
    temperature: 0.7,
    system_prompt: `I will provide you with a JSON string with a syntax error, please correct only the syntax error. Do not change any of the values. Please only respond with JSON and no other text.`,
    length_penalty: 1,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 0,
    log_performance_metrics: false,
  };

  const output = await replicate.run("meta/meta-llama-3-8b-instruct", {
    input,
  });
  return output.join("");
}

module.exports = debugJson;
