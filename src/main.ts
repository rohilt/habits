import App from './App.svelte';
import wasm from '../rust-parser/Cargo.toml';

// const app = new App({
// 	target: document.body
// });

// export default app;
const init = async () => {
	const gameOfLife = await wasm();

	const app = new App({
		target: document.body,
		props: {
			// https://svelte.dev/docs#Creating_a_component
			greet: gameOfLife
		}
	});
};

init();
