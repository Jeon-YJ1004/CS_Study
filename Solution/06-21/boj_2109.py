n=int(input())
if n==0:
  print("0")
else:

  pay_day=[[0] *2 for row in range(n)]

  maxPay=0

  for i in range(0,n):
    pay_day[i][0],pay_day[i][1]=map(int,(input().split(" ")))

  pay_day.sort(key=lambda x:(-x[1]))  
  maxDay=pay_day[0][1]
  schedule=[0]*(10001)

  # pay 기준 내림 차순 정렬
  pay_day.sort(key=lambda x:(-x[0],x[1]))

  for i in range(n):
    if schedule[pay_day[i][1]]==0:
      schedule[pay_day[i][1]]=1
      maxPay+=pay_day[i][0]
    else:
      for j in range(pay_day[i][1],0,-1):
        
        if schedule[j]==0:
          schedule[j]=1
          maxPay+=pay_day[i][0]
          break
    
  print(maxPay)
