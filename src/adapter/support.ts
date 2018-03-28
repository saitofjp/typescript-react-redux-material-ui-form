/**
 * await sleep(1000)
 */
export function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//TODO 外に出す
export const handleErrors = (response : Response) : Response => {
    // 4xx系, 5xx系エラーのときには response.ok = false になる
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }