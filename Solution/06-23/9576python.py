# t=int(input())
# for _ in range(t):
#   n,m=map(int,input().split(" "))
#   arr=[list(map(int,input().split(" "))) for _ in range(m)]
#   arr.sort(key=lambda x:(x[1],x[0]))
#   answer=0
#   book=[1]*(n+1)
#   for i in range(m):
#       for j in range(arr[i][1],arr[i][0],-1):
#         if book[j]:
#           book[j]=0
#           answer+=1
#           break
#   print(answer)

t=int(input())
for _ in range(t):
  n,m=map(int,input().split(" "))
  arr=[list(map(int,input().split(" "))) for _ in range(m)]
  arr.sort(key=lambda x:(x[1],x[0]))
  answer=0
  book=[1]*(n+1)
  for a,b in arr:
    for i in range(a,b+1):
      if book[i]:
        book[i]=0
        answer+=1
        break
  print(answer)