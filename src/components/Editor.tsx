import MonacoEditor, { loader, OnChange, OnMount } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";
import { useRef } from "react";

// Configure Monaco editor
loader.config({ monaco: monacoEditor });
monacoEditor.languages.register({ id: "python", extensions: [".py"] });

interface Props {
	onChange?: (code: string | undefined) => void | Promise<void>;
}

// Default code to show in the editor
const DEFAULT_CODE = `import databutton as db
import streamlit as st
import pandas as pd`;

export const Editor = ({ onChange }: Props) => {
	// Use a ref to keep track of the editor instance
	const ref = useRef<monacoEditor.editor.IStandaloneCodeEditor>();

	// Called when the editor is mounted
	const handleDidMount: OnMount = (editor) => {
		ref.current = editor;
	};

	// Called when the code changes
	const handleChange: OnChange = (value, event) => {
		onChange?.(value);
	};

	return (
		<MonacoEditor
			height='100%'
			width="100%"
			language="python"
			defaultValue={DEFAULT_CODE}
			theme="vs-dark"
			onChange={handleChange}
			onMount={handleDidMount}
		/>
	);
};
