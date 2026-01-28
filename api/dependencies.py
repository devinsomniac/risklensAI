from pathlib import Path
import joblib

Model_path = Path("models")/"risklens_uci_gb_calibrated_sigmoid.joblib"

#Container class to store the cached model
class _store:
    model = None

#Create a single instance to cache the model
store = _store()

#Model loading
def load_model():
    #Check whether model exist in the file path
    if not Model_path.exists():
        raise FileNotFoundError(f"Model not found: {Model_path.resolve()}")
    #Storing the model in the object varible
    store.model = joblib.load(Model_path)
    return store.model

def get_model():
    if store.model is None:
        return load_model()
    return store.model
