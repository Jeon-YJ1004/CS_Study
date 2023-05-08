n=int(input())
days=list(map(int,input().split(" ")))
days.sort(reverse=True)
for i in range(0,n):
  days[i]=days[i]-n+i+1
extra=max(days)
print(extra+n+1)