const Koa = require("koa");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("@koa/cors");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = new Koa();
app.use(cors());

app.use(async (ctx) => {
	const completion = await openai.createCompletion({
		model: "code-davinci-002",
		prompt:
			"# write a streamlit app that fetches data from yfinance and displays it",
		max_tokens: 256,
		temperature: 0,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});
	ctx.body = completion.data.choices[0].text;
});

const port = process.env.port || 8000;

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
