from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('h.html') 

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json() 
    user_input = data.get('user_input')  
    response_message = f'You entered: {user_input}'
    return jsonify({'message': response_message})

if __name__ == '__main__':
    app.run(debug=True)

