import { Editor } from "./components/Editor";
import "./styles.css";

export default function App() {
	return (
		<div className="app">
			<h1>Databutton Playground</h1>
			<div className="editor">
				<Editor />
			</div>
		</div>
	);
}
