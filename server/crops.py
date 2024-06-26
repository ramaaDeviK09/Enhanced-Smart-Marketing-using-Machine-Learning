from sklearn import metrics
import joblib as j
import numpy as np
import sys

model = j.load("D:/69/eCommerce/server/lgm.pkl")
# Model Testing
n=(int(sys.argv[1]))
p=(int(sys.argv[2]))
k=(int(sys.argv[3]))
t=(int(sys.argv[4]))
h=(int(sys.argv[5]))
ph=(int(sys.argv[6]))
r=(int(sys.argv[7]))
# Input 7 datapoints (N,P,K,temperature,humidity,ph,rainfall)
x = np.array([[n,p,k,t,h,ph,r,]])
x = x.reshape(1,-1)
p = model.predict(x)
# print("prediction_label: ",p[0])

label = {"crop_label_data":['rice,wheat,barley','maize,sorghum','chickpea,kidney beans,lima beans',
                'kidneybeans' ,'pigeonpeas' ,'mothbeans' ,'mungbean', 'blackgram',
                'lentil,acacia' ,'pomegranate' ,'banana,ginger,cardamom',
                'mango,papaya,peach' ,'grapes', 'watermelon', 'muskmelon,cucumbers',
                'apple,pears,nashi' ,'orange' ,'papaya', 'coconut,nutmeg',
                'cotton,Soybeans,Peanuts', 'jute' ,'coffee,chicory'],
         "crop_label_encoded":[20,11,3,9,18,13,14,2,10,19,1,12,7,21,15,0,16,17,4,6,8,5],
         
         }

p1 = p[0]
index_ = label["crop_label_encoded"].index(p1)
# print("prediction_crops: ")
# print(label["crop_label_data"][index_].split(","))
for i in label["crop_label_data"][index_].split(","):
       print(i) 
