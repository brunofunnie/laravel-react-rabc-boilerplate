SELECT 'CREATE DATABASE lync'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'lync')\gexec
