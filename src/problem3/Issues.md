### 1.

On line 38, `balancePriority` is calculated but never used
On line 39, `lhsPriority` is not defined anywhere

Fix: Use `balancePriority` instead of `lhsPriority`


### 2.

On line 48, missing an equal case in the sort comparison

Fix: Add `return 0` after the `rightPriority > leftPriority` clause


### 3.

On line 56, `formattedBalances` is calculated but never used
On line 63, 71, `sortedBalances` has no `formatted` property, so `balance.formatted` would be `undefined`

Fix: `rows` should be mapped from `formattedBalances` instead of `sortedBalances`


### 4.

On line 40, the filter is keeping only negative amounts

Fix: Change to `balance.amount > 0`


### 5.

`WalletBalance` has no `blockchain` property

Fix: Add `blockchain: string` to the interface


### 6.

Unnecessary `Props` interface extending `BoxProps` with nothing

Fix: Remove `Props` and use `BoxProps` instead


### 7.

On line 19, `blockchain` is typed as `any`

Fix: `blockchain: string`


### 8.

On line 15, `children` is destructured but not used anywhere

Fix: Remove `children`


### 8.

On line 68, array index is being used as key, which might cause potential rendering bug when the order changes

Fix: Use a unique identifier instead (e.g. ID). `currency` seems fitting


### 9.

`getPriority` has no state dependency, and is needlessly redefined every render

Fix: Move `getPriority` out of component


### 10.

On line 54, `prices` is not used in the `useMemo`, but is included in the dependency array

Fix: Remove `prices` from array


### 11.

`formattedBalances` and `rows` not memoized

Fix: Move the `formattedBalances` mapping into the `sortedBalances` `useMemo`. Wrap `rows` in `useMemo` with dependency array `[formattedBalances, prices]`
