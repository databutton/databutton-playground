const Koa = require("koa");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("@koa/cors");

// ADD API_KEY HERE (REMEMBER NOT TO COMMIT WITH THIS)
const API_KEY = "";

const configuration = new Configuration({
	apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = new Koa();
app.use(cors());

app.use(async (ctx) => {
	console.log(`q=${ctx.query.q}`);
	const completion = await openai.createCompletion({
		model: "code-davinci-002",
		prompt: ctx.query.q,
		max_tokens: 256,
		temperature: 0,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});
	ctx.body = completion.data.choices[0].text;
});

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
