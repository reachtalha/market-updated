interface FirebaseConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

const env = process.env.NODE_ENV;
let firebaseConfig: FirebaseConfig;

if (env === 'production') {
  firebaseConfig = {
    type: 'service_account',
    project_id: 'market-updated',
    private_key_id: 'cb16727ca27b5854ca4944e5f776eb5f57e397c3',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0Z/qgRR7BLhFN\nKpVBS6fsXpEpQ1376+41iTiMSf4H66oSuqEYSPVo8CiitAW9xmDrTursIK2P8GMS\nbEX3E+mWxacGRtkzDojb3xcMTc6Peeq3DEKVPJ1lJtsc7RhPch0HTgr+dvRQUfRN\nuFg0I3EPbrMygxI2Q4ODL5wlDX1d0sgY4BeHySjNB+dG5OIzBISMYiPKbJbZbWft\nUAktiM0OcK7N4E+tHVwEtRbhHme8rMziND1uZHM0T+tRo0G09/WjKBZLZqHGazrA\nhwpf6LhnFP6CuJp2AdEuCVMpYXNNAHezfwdCs+pt1JMov6xBFyk30v7QbjP9/SLq\nqTl43EQVAgMBAAECggEASX3ALdDqheSn3KkXs0lIJ3SgqtAMNcd3OyzisdekmgJp\nPobzgCqcenq2+wzd9+Cb88+qyLVJLwVMvqEH4W6lritnbpmm+nMV0ofvYi5CEtWm\nBZqDdzsBnUa2ZPK7AAYrCCJFPUMlJKE2JgEOQXMcqB4+9rlJTnyzUtouwDNeGj1H\n+VFuU2rZPSVwqKvcAJYLvoI5H7q9YkIRHrItVIvNZbZ60KPUlo36CYgypA2GzUjE\nIy5OdegsKd891jdCrdPbdtTmOk2wXg16Zp3D8ZlI5Xi7h0VAE9/wIauiVZUqddUV\nZgfmpCnLmJpMxZu7FmR34IZWIILQvHSWZmc5Qm4JMwKBgQDX0MkmVTIl62BhDHW8\nz9IUZvJM8S4Oth+xCazqyAaDdCjjnL3WYHKFCgezF6M5wAkiaqjVr5tc9B0EwsqQ\nhm6+nzwcaeGld6RW7Vq+wcfk6Q5RyHx6zPJDKLx1Umi8amwZ6c7yYJpGUucX6UlP\nNnTJUa0zBXcfZolbqEXPeY/z4wKBgQDV/1ggUG8HXn7a1cAag6GNHSNSwJBPS3tJ\ncZHFqw0fAjEe1vRPhFNYR+PH/5SIu72r+RJ2t186vHUprQ4uGbpK/y5udgOhJzgm\nW04jjT1uDu19S7+s6J7ndw0NY5o/seVvAO50r3dtfhUzLbLpJ08z3Kv3rFRCIa2Z\n08AR9cEZpwKBgQCMm/hiZEGvGQMLV/3hzZk3N7eIT97NMPXG9+HUegxcWzNE0NuS\nr/YNHfLUSYNMXgTVip6D0s0rq9S4RF2L+jpvMfoNHSMqFqBZDn4AKOsfBoUQ3cnU\njHEPNpxK6C1bDQ9vdrkhi7UYOm1cU98yn+1JOVDaHCZ3q+u0bxdEzRPwNwKBgQC9\nrkmEywa+92llu1U9qzNFC3DF5t2DC5rJ7JqTJRzKQX0coteGq/ncJEyod8hGsnJa\nvrk49Sy5uVX4jOYmwrM3ypxzWLO64jKI/SFzrbunlB+5kaziLIa9D+9H0ONmVd7R\n13eFggpPyRQtevI8a5VumMjtDZjZzVQ9J032HWj9vQKBgA32xcP2oCKPG/4CjpLj\nPlfeOz8fZqVFKHjIYsU62Wyhmt/he6PRyJDUQamMLs2Yi5Zlm4ZuOKGSqmjPgokU\nAbgDd552nVvHMwqekN4P+HW1DEvzkzhvfmKQnLUo1qUEiG9j92Nb3qq9CF0ZAiPn\nxB/j0yzjJmqAfO544KzU3ia7\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-yqyqi@market-updated.iam.gserviceaccount.com',
    client_id: '111868880567345105593',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yqyqi%40market-updated.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  };
} else {
  firebaseConfig = {
    type: 'service_account',
    project_id: 'allorganics-staging',
    private_key_id: '3290cbf8706160cdb1860736c971676b253a469e',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpYFBZRxgfG2VY\nNHB9T9qRQ4U4ZWyX0ZrN+0F1iarc+O7jW4/B0bRynTuAr/pQbSXf413KO2r8PunB\naxjzauaNqn4XdBf7EWkeQHybSWcg468vBoKm8fLCFsHrs750DIRWu3A7abyBvEU+\nuI3440bsw+CY+kKEqDxxk47j6/IXmATJvzRMgVUiaOwh0KU/Y3ZY9VIdAALrwLqn\nYV5E10SLHep3+yjBhfszTPCRsxEJ4eYhG8jCNjLSg42Rag7JEDM4Py46a42DID2N\nBaFj92e0LOnrpg7+Pd2CwmoqzRefYYop7DrzYz4EjvnMhEMKhO1HRZy9WmtkrNaf\nNS7WeWuVAgMBAAECggEADrPRZAp5T85hSFkHZDGhbqjfDfI/0OG027iyQ0YgxEqP\nfDXSvO5p7JWQv9b2UVZK/kub50dugkUxY0zMtdscerzMtEwNTbUnVu9PmlXZwCXv\n7am+ledkuIsH/QImI7f9J1yoIaoT5OV4RE8KrK0e1QAzGFgd1C8oHayi4iOFbSx5\nBJHJu+AyUSENRIovN9cAN/wxQqJ7Xekc1WMAXB156wTq2zwykVrWaq4ocVId4rak\nKrCv31wIWWOuH9IIWcvJ/i6LYo9DN79HLFd2RXdQXHZT8cSZA+F569NtcSsVoRbm\n4VcoXOvUEu1eyQTRyzY4vavsC43w6zQZOoHmOHsdWQKBgQD5++5HIusbTllAOZUe\n00LiYOGD4GSMqPSmTFRAzqk6757EltKCTtrKd5RQbZIzLXKZdJrPWKhpk2jqqcmq\nO1Y15/GW6IpNshM9Tr+ltVedoFw6hSLiFUJQ2eO0yZHb2A1ghh3R6PrYw4PW4QRU\nNmpzpds2ZPrcSfEDEOVanC5yuQKBgQDu/hFEm/k0JnkVygoXetL915e4TEeCFFOH\nM/u5HbW/S60pru6YboUyKIS8YqfuGekJaOG6Xds/WpniOgFDiA9Z9x+Ihn8wGRGn\n/QFqOYIlhDuOJQx/TK+bRh9A+fYwV/OjshiOBXN6pSsWH3fiTT5FHpuKSyrPgJsH\nxbxWeZwBvQKBgEI11eCFgRvUXpNCLRri/Z4T5ucU8czHmzTIlrArjGsNuFF9WPgm\nhpCFp4S94LEpYmb+mVo9sy1zW6B7o+wwlx7j9frwUGFPvwTH7L6pDzGynXrqdFjJ\nJK1haIwjrzw5NyHPo+pK+NWcwziQlKLxXrSOw0be7AqYkvsq6HRdVXgRAoGBAOYU\neKFZm2dmZongkSibmUbB6JGH9gu379Yo6H0FqjQ48cNAYvki5V4tfeQzAkKKdTwW\n2cFmnC141s7hUtglw8mzzIrOGOJAMCxOua7/IFln3UHyTv664BCXSH1wZ1+RPMBq\nM5N+kfcPzdQlhW+7N2ipl8pipRtRT28DIVcLCnLtAoGAKKrSNS6qGVcn50MT8KA3\nlNADllH07OQ3uLH0+fEw++onfENviE5+vsOb6l3fSmnZo4TD/J1C5lZ+Rx/po1lL\nJEYLf2VRKLi0V+L1n9Phek7Y0jnVcA8/Av/fbmIcUhSAmMFoilG6slbLJ7EiEZHr\ncfEtda/Ury68i59yiVyrddU=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-gh5do@allorganics-staging.iam.gserviceaccount.com',
    client_id: '102102360919704058270',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gh5do%40allorganics-staging.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  };
}

export { firebaseConfig };
