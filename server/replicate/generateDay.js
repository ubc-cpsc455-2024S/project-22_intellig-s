const replicate = require("./replicate");

async function generateDay(location, activities) {
  const input = {
    top_k: 0,
    top_p: 0.95,
    prompt: `give me a plan for a day in ${location} that does not include this list of activities: ${activities}`,
    max_tokens: 2000,
    temperature: 0.7,
    system_prompt: `Please only respond with JSON format text, I do not want any extra text and only want to see JSON text that I can take into a javascript application. The format should be as follows:
        {
            "activities": [
            {
                "time": "time (AM/PM)", 
                "location": "location name",
                "duration": time spent at location,
            }
            ]
        }`,
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

module.exports = generateDay;
