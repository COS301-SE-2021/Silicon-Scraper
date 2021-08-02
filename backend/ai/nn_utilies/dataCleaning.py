

#
#This function cleans the given data, by merging it with the model and getting rid of null rows
#
def setModel(data, models):
    data['availability'] = [1 if x == 'In Stock' else 0 for x in data['availability']]

    for dt in data.itertuples():
        for model in models.itertuples():
            if dt.model.find(str(model.model)) != -1:
                data.at[dt.Index,'modelID'] = model.Index
                continue


    return data


#
#This function cleans the given data by merging its brand and getting rid of the empty rows
#
def setBrand(data):
    brands = set(data["brand"].str.upper())
    brands = brands
    brands = pd.DataFrame(brands)
    brands = brands.rename(columns={0: "brand"})
    brands

    for brand in brands.itertuples():
        data.loc[data["brand"].str.upper() == brand.brand, "brand"] = brand.Index

    return data

