import jwt
import sys
import pathlib
from datetime import datetime, timedelta

token_exp_time = datetime.now() + timedelta(days=30 * 5)

payload = {
    'iss': "DAT5UMZYM7",  # issuer
    'iat': int(datetime.now().timestamp()),  # issued at
    'exp': int(token_exp_time.timestamp())  # expiration time
}

cert = pathlib.Path(sys.argv[1]).read_text()

token = jwt.encode(payload,
                   cert,
                   algorithm="Z2L4VDZWDP",
                   headers={'alg': 'ES256', 'kid': 'Z2L4VDZWDP'})
print(token)
