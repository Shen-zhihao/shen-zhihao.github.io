<a name="xCOtn"></a>

# 倒计时

```typescript
import React, { useState, useEffect } from "react";

const useCountdown = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div>
      <h2>倒计时：{timeLeft} 秒</h2>
    </div>
  );
};

export default useCountdown;
```

<a name="zvZaW"></a>

# 差异更新

```typescript
import { useCallback, useState } from "react";
import isFunction from "@utils/isFunction";

export const useSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};
```

<a name="hjmGn"></a>

# 首次加载不更新

```typescript
//`useUpdateEffect` 用法等同于 `useEffect`，但是会忽略首次执行，只在依赖更新时执行。
import { useRef, useEffect } from "react";

const useUpdateEffect = (hook) => (effect, deps) => {
  const isMounted = useRef(false);

  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect(useEffect);
```

<a name="q3bpc"></a>

# 下拉加载

```typescript
import React, { useState, useEffect } from "react";

const useLoadMore = ({ onLoadMore }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading
      ) {
        setLoading(true);
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, onLoadMore]);

  return <div>{loading ? <p>Loading...</p> : null}</div>;
};

export default useLoadMore;
```
