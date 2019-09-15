from textgenrnn import textgenrnn

textgen = textgenrnn()
textgen.train_from_file("hackmit19/tongue_twister/twister_db.txt",num_epochs = 100,gen_epochs = 100,new_model = True, word_level = True, max_length = 6)

def generate():
    return textgen.generate(1, temperature = 0.8)