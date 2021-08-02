
#
#this function gets the data into the train test sets
#
def getData(data):
    train_features, test_features, train_labels, test_labels = train_test_split(data)
    input_data = np.array(train_features)
    output_label = np.array(train_labels)

    test_data = np.array(test_features)
    test_output = np.array(test_labels)