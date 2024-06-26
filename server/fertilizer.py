from sklearn import metrics
from joblib import load
import sys
import numpy as np
model = load("lgm1.pkl")
# Model Testing

# Input 8 datapoints (N,P,K,temperature,humidity,ph,rainfall,crop_label)
n=(int(sys.argv[1]))
p=(int(sys.argv[2]))
k=(int(sys.argv[3]))
t=(int(sys.argv[4]))
h=(int(sys.argv[5]))
ph=(int(sys.argv[6]))
r=(int(sys.argv[7]))
c=(int(sys.argv[8]))
x = np.array([[90.,42.,43.,20.87974371,82.00274423,6.50298529,202.9355362,20.]])
x = x.reshape(1,-1)
p = model.predict(x)
# print("prediction_label: ",p[0])

label1 = {
         "fertilizer_data":['Ammonium sulphate,Nitrogen' ,'UAN', 'Basal fertilizers', 'urea',
                'DAP,MAP,SSP' ,'P2O5,K2O' ,'cowdung,organic bloom',
                'ammonium sulphate and calcium ammonium nitrate', 'urea,super phosphate',
                'urea, ammonium sulfate, calcium nitrate, and ammonium nitrate' ,'FYM',
                'Growmore fertiliser,Rose Fertilizer',
                'Ammonium Sulfate, Ammonium Phosphate' ,'Manuring',
                'DAP,Muriate of Potash ' ,'iron (Fe), boron (B), manganese (Mn)', 'DAP',
                'dolomite'],
         "fertilizer_encoded":[1,10,2,15,4,9,12,11,17,16,6,7,0,8,5,14,3,13]}


p1 = p[0]
index_ = label1["fertilizer_encoded"].index(p1)
# print("prediction_fertilizers: ")
for i in label1["fertilizer_data"][index_].split(","):
       print(i) 
