import { useCallback, useState } from "react";

// メモ一覧のカスタムフック
export const useMemoList = () => {
    // メモ一覧のstate
    const [memos, setMemos] = useState<string[]>([]);

    // 追加のロジック
    const addTodo = useCallback(
      (text: string) => {
        // stateを正常に検知させるために、新しく配列を作成
        const newMemos: string[] = [...memos];  // スプレッド構文(参照先に影響が出ないように)
        // テキストを配列に入れる
        newMemos.push(text);
        // メモを更新(引数には、新しくmemosにする値を入れる)
        setMemos(newMemos);
      },
      [memos]
    );

    // 削除のロジック
  const deleteTodo = useCallback(
    (index: number) => {
      // stateを正常に検知させるために、新しく配列を作成
      const newMemos: string[] = [...memos];
      // 指定の番号を削除
      newMemos.splice(index, 1);
      // 新しい配列をセット
      setMemos(newMemos);
    },
    [memos]
  );

  return { memos, addTodo, deleteTodo };
};