import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemoList } from "../hooks/useMemoList";

export const App: FC = () => {

  // カスタムフックからそれぞれの値を取得
  const { memos, addTodo, deleteTodo } = useMemoList();

  //テキストフィールドのstate
  const [text, setText] = useState<string>("");

  //テキストフィール入力時に入力内容をstateに設定
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  // 追加ボタンクリック時にテキストフィールドの文字を入れる
  const onClickAdd = () => {
    //メモ追加ロジック
    addTodo(text);
    // メモを更新したので、テキストフィールドを空にする
    setText("");
  };

  // 削除ボタンクリック時に該当する要素を削除する(関数が再生成されないようにuserCallbackでメモ化)
  const onClickDelete = useCallback(
    (index: number) => {
      deleteTodo(index)
    },
    [deleteTodo]
  );

  return (
    <div>
      <h1>簡単メモアプリ</h1>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  ); 
};

const SButton = styled.button`
  margin-left: 16px;
`;