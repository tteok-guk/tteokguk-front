'use client'
// AuthSesseon을 Layout.tsx 에서 사용하기 위해 컴포넌트화 시킴
import { SessionProvider } from "next-auth/react";

type Props = ({
  children: React.ReactNode;
  });

export default function AuthSession({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}