

#
#This function cleans the given data, by merging it with the model and getting rid of null rows
#
def cleanData(data, models):
    data['availability'] = [1 if x == 'In Stock' else 0 for x in data['availability']]

    for dt in data.itertuples():
        for model in models.itertuples():
            if dt.model.find(str(model.model)) != -1:
                data.at[dt.Index,'modelID'] = model.Index
                continue


    return data

