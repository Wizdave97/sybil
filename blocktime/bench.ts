import { ApiPromise, WsProvider } from "@polkadot/api";

async function main() {
  const provider = new WsProvider("ws://127.0.0.1:9944");
  const api = await ApiPromise.create({
    provider,
  });
  let last_block_time = unix_seconds();
  let blocktimes: number[] = [];
  await api.rpc.chain.subscribeNewHeads(() => {
    const now = unix_seconds();
    const new_time = now - last_block_time;
    console.log(`blocktime: ${new_time}s\n`);
    blocktimes.push(new_time);
    last_block_time = now;
  });
  blocktimes.shift();
  console.log(`block times: ${blocktimes}\n\n`);
}

const unix_seconds = () => Date.now() / 1000;

main();
