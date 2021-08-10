#
#This function splits the data into training and testing data with its labels
#
def train_test_split(data):
    train_dataset = data.sample(frac=0.8, random_state=1)
    test_dataset = data.drop(train_dataset.index)

    train_features = train_dataset.copy()
    test_features = test_dataset.copy()

    train_labels = train_features.pop('price')
    test_labels = test_features.pop('price')

    return (train_features, train_labels, test_features, test_labels)