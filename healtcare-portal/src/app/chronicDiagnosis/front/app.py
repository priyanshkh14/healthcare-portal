from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from imblearn.under_sampling import RandomUnderSampler
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Load datasets
df_pcos = pd.read_csv('PCOS_data_final.csv')
df_diabetes = pd.read_csv('final_diabetes_data.csv')
df_depression = pd.read_csv('depression_data.csv')
df_disease = pd.read_csv('Training.csv', header=0).dropna(axis=1)

# PCOS model
X_pcos = df_pcos.drop("PCOS (Y/N)", axis=1)
Y_pcos = df_pcos["PCOS (Y/N)"]
imputer_pcos = SimpleImputer(strategy='mean')
X_pcos_imputed = pd.DataFrame(imputer_pcos.fit_transform(X_pcos), columns=X_pcos.columns)
rfc_pcos = RandomForestClassifier(criterion='gini', max_depth=12, max_features='log2', n_estimators=200, n_jobs=1)
rfc_pcos.fit(X_pcos_imputed, Y_pcos)

# Diabetes model
X_diabetes = df_diabetes.drop(["Diabetes_012"], axis=1)
Y_diabetes = df_diabetes["Diabetes_012"]
imputer_diabetes = SimpleImputer(strategy='mean')
X_diabetes_imputed = pd.DataFrame(imputer_diabetes.fit_transform(X_diabetes), columns=X_diabetes.columns)
rus_diabetes = RandomUnderSampler(sampling_strategy={0.0: 50, 1.0: 30, 2.0: 40})
x_res_diabetes, y_res_diabetes = rus_diabetes.fit_resample(X_diabetes_imputed, Y_diabetes)
rfc_diabetes = RandomForestClassifier()
rfc_diabetes.fit(x_res_diabetes, y_res_diabetes)

# Depression model
Y_depression = df_depression['Category']
X_depression = df_depression.drop('Category', axis=1)
rfc_depression = RandomForestClassifier()
rfc_depression.fit(X_depression, Y_depression)

# Disease model
encoder = LabelEncoder()
df_disease["prognosis"] = encoder.fit_transform(df_disease["prognosis"])
XDisease = df_disease.iloc[:, :-1]
yDisease = df_disease.iloc[:, -1]
symptoms_disease = XDisease.columns.values
final_svm_model = SVC()
final_nb_model = GaussianNB()
final_rf_model = RandomForestClassifier(random_state=18)
final_svm_model.fit(XDisease, yDisease)
final_nb_model.fit(XDisease, yDisease)
final_rf_model.fit(XDisease, yDisease)

# Create a symptom index dictionary to encode the input symptoms into numerical form
symptom_index_disease = {}
for index, value in enumerate(symptoms_disease):
    symptom_index_disease[value] = index

data_dict_disease = {
    "symptom_index": symptom_index_disease,
    "predictions_classes": encoder.classes_
}

# Flask routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pcos', methods=['GET', 'POST'])
def pcos():
    if request.method == 'POST':
        user_symptoms_pcos = request.form.get('symptoms')
        user_input_list = user_symptoms_pcos.split(',')
        user_input_array = np.array(user_input_list).reshape(1, -1)
        user_input_imputed = pd.DataFrame(imputer_pcos.transform(user_input_array), columns=X_pcos.columns)
        predicted_pcos = rfc_pcos.predict(user_input_imputed)
        return render_template('pcos_result.html', prediction=predicted_pcos[0])

    return render_template('pcos.html')

@app.route('/diabetes', methods=['GET', 'POST'])
def diabetes():
    if request.method == 'POST':
        user_symptoms_diabetes = request.form.get('symptoms')
        user_input_list = user_symptoms_diabetes.split(',')
        user_input_array = np.array(user_input_list).reshape(1, -1)
        user_input_imputed = pd.DataFrame(imputer_diabetes.transform(user_input_array), columns=X_diabetes.columns)
        predicted_diabetes = rfc_diabetes.predict(user_input_imputed)
        return render_template('diabetes_result.html', prediction=predicted_diabetes[0])

    return render_template('diabetes.html')

@app.route('/depression', methods=['GET', 'POST'])
def depression():
    if request.method == 'POST':
        user_symptoms_depression = request.form.get('symptoms')
        user_input_list = user_symptoms_depression.split(',')
        user_input_array = np.array(user_input_list).reshape(1, -1)
        predicted_depression = rfc_depression.predict(user_input_array)
        return render_template('depression_result.html', prediction=predicted_depression[0])

    return render_template('depression.html')

@app.route('/disease', methods=['GET', 'POST'])
def disease():
    if request.method == 'POST':
        user_symptoms_disease = request.form.get('symptoms')
        user_input_list = user_symptoms_disease.split(',')
        input_data = [0] * len(data_dict_disease["symptom_index"])
        for symptom in user_input_list:
            index = data_dict_disease["symptom_index"].get(symptom, None)
            if index is not None:
                input_data[index] = 1
        input_data = np.array(input_data).reshape(1, -1)
        rf_prediction = data_dict_disease["predictions_classes"][final_rf_model.predict(input_data)[0]]
        nb_prediction = data_dict_disease["predictions_classes"][final_nb_model.predict(input_data)[0]]
        svm_prediction = data_dict_disease["predictions_classes"][final_svm_model.predict(input_data)[0]]
        predictions = [rf_prediction, nb_prediction, svm_prediction]
        final_prediction = np.unique(predictions)[np.argmax(np.unique(predictions, return_counts=True)[1])]
        return render_template('disease_result.html', prediction=final_prediction)

    return render_template('disease.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
