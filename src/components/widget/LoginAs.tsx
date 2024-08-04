'use client'
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

function LoginAsComponent(props: {
  setLoginAs: any;
  enumLogin: any;
}) {
  const { setLoginAs: setLoginWith, enumLogin } = props;
  const [loginAs, setLoginAs] = useState(enumLogin[0].type);
  return (
    <div className="mt-4">
      <div className="flex flex-row space-x-2">
        {enumLogin.map((item: any, index: number) => {
          return (
            <div
              key={index.toString()}
              role="button"
              onClick={() => {
                setLoginWith(item.type);
                setLoginAs(item.type);
              }}
              className={cn(
                "p-3 border rounded-md flex flex-col justify-start items-start",
                loginAs === item.type
                  ? "bg-primary text-white"
                  : "bg-transparent"
              )}
            >
              {item.icon}
              <p className="font-bold text-xs mt-2">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(LoginAsComponent)