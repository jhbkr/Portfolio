-- Politique pour permettre l'insertion de contacts (tout le monde peut créer)
CREATE POLICY "Enable insert for all users" ON contacts
FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture (optionnel, pour le dashboard admin)
CREATE POLICY "Enable read access for all users" ON contacts
FOR SELECT USING (true);

-- Politique pour permettre la mise à jour (optionnel, pour le dashboard admin)
CREATE POLICY "Enable update for all users" ON contacts
FOR UPDATE USING (true);
